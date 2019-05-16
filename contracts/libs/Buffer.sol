pragma solidity ^0.5.7;

library Buffer
{

	struct buffer
	{
		bytes buf;
		uint256 length;
	}

	function init(buffer memory _buf, uint _length)
	internal pure
	{
		uint length = _length;
		if (length % 32 != 0)
		{
			length += 32 - (length % 32);
		}
		_buf.length = length; // Allocate space for the buffer data
		assembly
		{
			let ptr := mload(0x40)
			mstore(_buf, ptr)
			mstore(ptr, 0)
			mstore(0x40, add(ptr, length))
		}
	}

	function resize(buffer memory _buf, uint _length)
	private pure
	{
		bytes memory oldbuf = _buf.buf;
		init(_buf, _length);
		append(_buf, oldbuf);
	}

	function max(uint _a, uint _b)
	private pure returns (uint _max)
	{
		return (_a > _b) ? _a : _b;
	}

	function append(buffer memory _buf, bytes memory _data)
	internal pure returns (buffer memory _buffer)
	{
		if (_data.length + _buf.buf.length > _buf.length)
		{
			resize(_buf, max(_buf.length, _data.length) * 2);
		}
		uint dest;
		uint src;
		uint len = _data.length;
		assembly
		{
			let bufptr := mload(_buf) // Memory address of the buffer data
			let buflen := mload(bufptr) // Length of existing buffer data
			dest := add(add(bufptr, buflen), 32) // Start address = buffer address + buffer length + sizeof(buffer length)
			mstore(bufptr, add(buflen, mload(_data))) // Update buffer length
			src := add(_data, 32)
		}
		for(; len >= 32; len -= 32) // Copy word-length chunks while possible
		{
			assembly
			{
				mstore(dest, mload(src))
			}
			dest += 32;
			src += 32;
		}
		uint mask = 256 ** (32 - len) - 1; // Copy remaining bytes
		assembly
		{
			let srcpart := and(mload(src), not(mask))
			let destpart := and(mload(dest), mask)
			mstore(dest, or(destpart, srcpart))
		}
		return _buf;
	}

	function append(buffer memory _buf, uint8 _data)
	internal pure
	{
		if (_buf.buf.length + 1 > _buf.length)
		{
			resize(_buf, _buf.length * 2);
		}
		assembly
		{
			let bufptr := mload(_buf) // Memory address of the buffer data
			let buflen := mload(bufptr) // Length of existing buffer data
			let dest := add(add(bufptr, buflen), 32) // Address = buffer address + buffer length + sizeof(buffer length)
			mstore8(dest, _data)
			mstore(bufptr, add(buflen, 1)) // Update buffer length
		}
	}
}
