wget -O ./mocks/openapi.yaml https://raw.githubusercontent.com/phillyfan1138/option_price_faas/master/docs/openapi_merged.yml

wget -O ./mocks/apisprout.tar.xz https://github.com/danielgtaylor/apisprout/releases/download/v1.0.1/apisprout-v1.0.1-linux.tar.xz

tar xf ./mocks/apisprout.tar.xz -C ./mocks
rm ./mocks/apisprout.tar.xz 