.PHONY: build-frontend install start-prod

start-prod:
	cd frontend && yarn run build
	cd backend && yarn run start


start-dev: 
	cd frontend && yarn run watch &
	cd backend && yarn run start



/////////////////////////////////////////////////

build-frontend:
	rm -rf backend/public
	mkdir -p backend/public
	export TD_ENV=prod && cd frontend && yarn run build
	cp -a frontend/build/. backend/public/

install:
	yarn
	$(MAKE) install-frontend
	$(MAKE) install-backend

install-frontend:
	cd frontend && yarn

install-backend:
	cd backend && yarn

start-prod:
	export TD_ENV=prod && \
	$(MAKE) install && \
	$(MAKE) build-frontend && \
	cd backend && \
	yarn run start

start-backend:
	export TD_ENV=dev && \
	cd backend && \
	yarn run start

start-frontend:
	export TD_ENV=dev && \
	cd frontend && \
	PORT=3001 yarn run start

start-frontend-tests:
	export TD_ENV=test && \
	cd frontend && \
	yarn run test

start-backend-tests:
	./backend/test/allTests.sh

test:
ifeq (${file},)
	$(MAKE) start-backend-tests
	export CI=true && $(MAKE) start-frontend-tests
else
	export TD_ENV=test && mocha --compilers js:babel-core/register backend/test/${file}.js
endif
