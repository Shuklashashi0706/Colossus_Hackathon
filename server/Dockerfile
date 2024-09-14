FROM golang:alpine as builder
WORKDIR /app
COPY go.mod .
COPY go.sum .
RUN apk add --no-cache build-base openssl
RUN go mod download
COPY . .
RUN apk add --no-cache git && go build -o myriadflow_gateway . && apk del git
FROM alpine
WORKDIR /app
RUN apk add --no-cache openssl
COPY --from=builder /app/myriadflow_gateway .
CMD [ "./myriadflow_gateway" ]
