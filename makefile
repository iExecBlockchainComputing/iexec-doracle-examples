# FLATTEN
PATH_FLAT = ./build/sources/
FILE_FLAT = flattened.sol
SRCS   =                                                                      \
	node_modules/iexec-poco/build/sources/flattened.sol                         \
	node_modules/iexec-doracle-base/contracts/IexecDoracle.sol                  \
	contracts/PriceOracle.sol

.PHONY: flatten

all:
	@echo "Usage: make [flatten]"

flatten: $(PATH_FLAT)$(FILE_FLAT)

$(PATH_FLAT)$(FILE_FLAT): $(FILES) makefile
	@mkdir -p $(PATH_FLAT)
	@rm -f $@
	@echo "pragma solidity ^0.5.8;" >> $@
	@echo "pragma experimental ABIEncoderV2;" >> $@
	@$(foreach file, $(SRCS),                                    \
		echo -n "Adding $(file) to $@ ...";                        \
		cat $(file) | sed '/^pragma/ d' | sed '/^import/ d' >> $@; \
		echo " done";                                              \
	)
