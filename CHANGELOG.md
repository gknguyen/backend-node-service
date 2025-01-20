# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [1.2.0](https://github.com/gknguyen/backend-node-service/compare/1.0.0...1.2.0) (2025-01-20)


### Features

* add docker build ([01f0eaf](https://github.com/gknguyen/backend-node-service/commit/01f0eafa6c38587fd66c709ad7387bfa7d934f66))
* add e2e test report ([#6](https://gk-github/gknguyen/backend-node-service/issues/6)) ([90bf3d4](https://github.com/gknguyen/backend-node-service/commit/90bf3d4783214e4701e2811db0b611ed657eb8c0))
* add event emmitter to push message to sse channel ([e37bb54](https://github.com/gknguyen/backend-node-service/commit/e37bb54bdb6741950429eb7e380803822ab990cc))
* add lint pipeline ([#11](https://gk-github/gknguyen/backend-node-service/issues/11)) ([6524ad9](https://github.com/gknguyen/backend-node-service/commit/6524ad977ed89c702368c899ca1357cb1952cbb6))
* add LoggerMiddleware ([bb551e6](https://github.com/gknguyen/backend-node-service/commit/bb551e64bd9e04e299ac19f856cc21983501acd2))
* add module health ([0680f9a](https://github.com/gknguyen/backend-node-service/commit/0680f9a618c58ec715d85b624d2cb8bf053be364))
* add payment-gateway module - use stripe ([4e59e2b](https://github.com/gknguyen/backend-node-service/commit/4e59e2b1c759d317623d71746134c8e8b4304879))
* add pubsub sse channel ([c50b419](https://github.com/gknguyen/backend-node-service/commit/c50b4195e27ff596a0c134b046b4ce6cc0a62cce))
* add some global middlewares ([599ad4d](https://github.com/gknguyen/backend-node-service/commit/599ad4dde59ca59d473cb8795cb70c12f2a05a02))
* add the built in nest logger ([b26f095](https://github.com/gknguyen/backend-node-service/commit/b26f095f50f07600c396198a95723f82183d1a09))
* add unit test report ([#5](https://gk-github/gknguyen/backend-node-service/issues/5)) ([13f681a](https://github.com/gknguyen/backend-node-service/commit/13f681adf127eaf93d946eb0eb5e3eca13a987c2))
* add winston logger ([c52520f](https://github.com/gknguyen/backend-node-service/commit/c52520f89008ace19da3242cc7189fa0db1b9d5e))
* bump to node v22 ([6260312](https://github.com/gknguyen/backend-node-service/commit/626031219709a6321ec31913dcfab219c68b3984))
* cd - add build security scan step ([#7](https://gk-github/gknguyen/backend-node-service/issues/7)) ([7afb694](https://github.com/gknguyen/backend-node-service/commit/7afb694b259db90efc4353065e06580025293591))
* init socket.io ([#10](https://gk-github/gknguyen/backend-node-service/issues/10)) ([4dbb6ba](https://github.com/gknguyen/backend-node-service/commit/4dbb6ba589b471ee504354613abc6b2d98293961))


### Bug Fixes

* correct health api controller file name ([d5fdcad](https://github.com/gknguyen/backend-node-service/commit/d5fdcad47f2036fec63bc38a465f103ce4633dda))


### Chores

* **deps:** bump path-to-regexp and @nestjs/platform-express ([#3](https://gk-github/gknguyen/backend-node-service/issues/3)) ([79bb4ee](https://github.com/gknguyen/backend-node-service/commit/79bb4ee40844e38f0d984d8820799ae75251bab8))
* do not git ignore swagger.json file ([aeadfe4](https://github.com/gknguyen/backend-node-service/commit/aeadfe4dd43cb745a3fc5068b2ae6b9d57ad6826))
* git ignore swagger.json ([f95c62a](https://github.com/gknguyen/backend-node-service/commit/f95c62ae9c99703e9cc52bb89eaebb5c70fc4774))
* refactor StripeApiController ([a96aadd](https://github.com/gknguyen/backend-node-service/commit/a96aadda84bd3da54d555cbab53c1bbed2a5379d))
* update service description, explain Technical Approach ([4c7ea0a](https://github.com/gknguyen/backend-node-service/commit/4c7ea0adc80d04c1b6449de1aafc0b5857114ee1))
* update the way to define base logger as factory ([83b7320](https://github.com/gknguyen/backend-node-service/commit/83b73206a95473a943d49cfa2316973d59aebdfb))

## [1.1.0](https://github.com/gknguyen/backend-node-service/compare/1.0.0...1.1.0) (2024-10-07)


### Features

* add module health ([0680f9a](https://github.com/gknguyen/backend-node-service/commit/0680f9a618c58ec715d85b624d2cb8bf053be364))
* add the built in nest logger ([b26f095](https://github.com/gknguyen/backend-node-service/commit/b26f095f50f07600c396198a95723f82183d1a09))
* add winston logger ([c52520f](https://github.com/gknguyen/backend-node-service/commit/c52520f89008ace19da3242cc7189fa0db1b9d5e))


### Chores

* update service description, explain Technical Approach ([4c7ea0a](https://github.com/gknguyen/backend-node-service/commit/4c7ea0adc80d04c1b6449de1aafc0b5857114ee1))
* update the way to define base logger as factory ([83b7320](https://github.com/gknguyen/backend-node-service/commit/83b73206a95473a943d49cfa2316973d59aebdfb))

## 1.0.0 (2024-10-06)


### Features

* add @nestjs/swagger ([fa9e9c4](https://github.com/gknguyen/backend-node-service/commit/fa9e9c4d69a60e00d08bbbc9e7cee78143f0499e))
* add config & dotenv ([97fb96f](https://github.com/gknguyen/backend-node-service/commit/97fb96f5e7254960c46c79407be649f6e659026a))
* add github actions: check-version & release-tag ([ca78d2c](https://github.com/gknguyen/backend-node-service/commit/ca78d2c77a69553e29f5fbf4359ef302617a69d2))
* add husky ([b51303f](https://github.com/gknguyen/backend-node-service/commit/b51303ff299931a4a9283e0f9d3209834a433208))
* add pino logger ([4aee0f1](https://github.com/gknguyen/backend-node-service/commit/4aee0f13fb19e7e3a93ea4351da4741c27acbb0e))
* add standard-version ([971933f](https://github.com/gknguyen/backend-node-service/commit/971933fc2c434ee55e81f1af5d98311f0f7dc1e6))
* commitlint ([be47667](https://github.com/gknguyen/backend-node-service/commit/be47667de5b647c64b25cb7397d443e72f2aacf1))
* init source ([88a7568](https://github.com/gknguyen/backend-node-service/commit/88a75688fcc48c62a35b7b5af17ae3f2e92d1ff0))
* prettier - increase printWidth to 100 ([000c99e](https://github.com/gknguyen/backend-node-service/commit/000c99ed53736392486dfafa9e359b553e774b8b))


### Chores

* update service description ([8452c9f](https://github.com/gknguyen/backend-node-service/commit/8452c9f46bee61f00f5de0a3c7c8e96cac2b43f4))
