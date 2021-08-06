FROM python:3.7-alpine3.10

RUN apk --no-cache --update-cache add gcc libc-dev
RUN pip3 install requests
RUN pip3 install eth_abi

COPY ./src /app

ENTRYPOINT ["python3", "/app/app.py"]
