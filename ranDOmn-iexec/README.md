
# ranDOmn-iexec

iExec decentralized oracle for aggregating two random number generator APIs and providing up to 256 random uint numbers.


### Data sources

[ANU QNRG](https://qrng.anu.edu.au/):  Random numbers generated in real-time by measuring the quantum fluctuations of the vacuum.

[CSNRG](csrng.net): [NIST](https://csrc.nist.gov/projects/cryptographic-module-validation-program/certificate/3016) Certified random number generator.

*Note: services provided by these sources do not require a dedicated API key.*

### Aggregation algorithm


    get 256 QNRG random uint8 numbers rqnrg
    get 1 CSNRG random uint8 number rcsnrg
    for n requested numbers :
	    add rqnrg at index rcsnrg to output list
	    set index at next position
	return output list


### IO

input :
- The requested count of uint8 random numbers - a number between 1 and 256 (default is 1).

*example: 10*

output :
- An ABI encoded bytes representation of an array of random numbers

example:
*Encoded result  of [55, 85, 119, 15, 152, 32, 104, 205, 19, 36] is* `0x000000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000003700000000000000000000000000000000000000000000000000000000000000550000000000000000000000000000000000000000000000000000000000000077000000000000000000000000000000000000000000000000000000000000000f00000000000000000000000000000000000000000000000000000000000000980000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000006800000000000000000000000000000000000000000000000000000000000000cd00000000000000000000000000000000000000000000000000000000000000130000000000000000000000000000000000000000000000000000000000000024`

## Running locally

Build the docker image :

    docker image build -t randomn-iexec .

Run the docker image, only the output folder path is needed

    docker run --rm -it -v $(pwd):/iexec_out -e IEXEC_OUT=/iexec_out randomn-iexec 10

the computed.json file contains the callback data that is used by the oracle.

 ## Deploying and running on iExec

If this is your first time using iExec, we recommend you to first follow the iExec official [quickstart guide](https://docs.iex.ec/for-developers/quick-start-for-developers).

If you're familiar with iExec, run the sconify.sh script to transform the docker application into a TEE mode, then deploy as a trusted application.

When launching an execution, you will have to specify the contract address for the callback data, you will find n example below :

    iexec app run --tag tee --workerpool 0xe6806E69BA8650AF23264702ddD43C4DCe35CcCe --watch --callback 0x0C22D575B783CE85322533f11334855dD24Ef936 --chain viviani --args "5"

--workerpol is passed here only  to specify a debug worker pool
--callback is the deployed smart contract address that will process the data

*In he contracts folder, you will find the smart contract code that corresponds to 0x0C22D575B783CE85322533f11334855dD24Ef936*
