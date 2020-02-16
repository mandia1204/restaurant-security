#!/bin/bash
TOOLS_PATH="$(pwd)/node_modules/.bin/grpc_tools_node_protoc_plugin.cmd"
PROTOC_GEN_TS_PATH="$(pwd)/node_modules/.bin/protoc-gen-ts.cmd"
PROTO_DEST=./src/grpc-services
PROTO_SRC=./src/protos

#generate grpc js files
grpc_tools_node_protoc \
--js_out=import_style=commonjs,binary:${PROTO_DEST} \
--grpc_out=${PROTO_DEST} \
--plugin=protoc-gen-grpc=${TOOLS_PATH} \
-I ${PROTO_SRC} \
${PROTO_SRC}/*.proto

#generates d.ts files
protoc \
--plugin=protoc-gen-ts=${PROTOC_GEN_TS_PATH} \
--ts_out=${PROTO_DEST} \
-I ${PROTO_SRC} \
${PROTO_SRC}/*.proto

echo 'completed!'
