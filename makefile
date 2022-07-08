.PHONY: start stop restart client server install production run

start:
	docker-compose up --detach

stop:
	docker-compose down --remove-orphans --volumes --timeout 0

restart: stop start

install: start
	docker-compose exec node npm install

client: install
	docker-compose exec node npm --workspace client run development

server: install
	docker-compose exec node npm --workspace server run development

production: install
	docker-compose exec node npm --workspaces run production

run: production
	docker-compose exec node npm start
