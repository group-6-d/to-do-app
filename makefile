.PHONY: run-backend run-frontend

start:
	cd api && npm run dev & cd frontend && npm run dev