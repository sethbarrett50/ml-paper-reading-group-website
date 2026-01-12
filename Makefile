SHELL := /usr/bin/env bash
.DEFAULT_GOAL := help

NPM ?= npm

TREE_IGNORE := node_modules|.svelte-kit|build|dist|.vercel|.netlify|.turbo|.parcel-cache|.cache|.vite|coverage|.nyc_output|.eslintcache|.DS_Store|.idea|.vscode|.git|.pnpm-store|.yarn|.pnp|.pnp.cjs|package-lock.json|pnpm-lock.yaml|yarn.lock

.PHONY: help \
        install clean deep-clean \
        dev build preview \
        check check-watch lint format \
        tree routes pkg-overview overview \
        search

help: ## Show available targets
	@echo "Repo root: $$(pwd)"
	@echo ""
	@echo "Targets:"
	@grep -E '^[a-zA-Z0-9_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-18s\033[0m %s\n", $$1, $$2}'
	@echo ""
	@echo "Examples:"
	@echo "  make install"
	@echo "  make dev"
	@echo "  make build"
	@echo "  make overview"
	@echo "  make search PATTERN='prerender|trailingSlash|adapter-static'"

install: ## Install deps (uses lockfile if present)
	$(NPM) ci

dev: ## Run dev server
	$(NPM) run dev

build: ## Build site
	$(NPM) run build

preview: ## Preview built site locally
	$(NPM) run preview

check: ## Type-check / svelte-check (if configured)
	$(NPM) run check

check-watch: ## Watch mode for check (if configured)
	$(NPM) run check:watch

lint: ## Lint (if configured)
	$(NPM) run lint

format: ## Format (if configured)
	$(NPM) run format

clean: ## Remove generated build artifacts
	rm -rf .svelte-kit build dist

deep-clean: clean ## Also remove dependencies
	rm -rf node_modules

tree: ## Print repo tree (ignoring common dirs)
	tree -a --dirsfirst -I "$(TREE_IGNORE)" .

routes: ## List SvelteKit route files
	find src/routes -type f \
		\( -name '+*.svelte' -o -name '+*.ts' -o -name '+*.js' -o -name '+*.server.ts' -o -name '+layout*' -o -name '+page*' \) \
		-print | sort

pkg-overview: ## Show package + key config snapshots
	@echo "===== package.json (top) ====="
	sed -n '1,220p' package.json
	@echo ""
	@echo "===== svelte.config.* ====="
	@ls -1 svelte.config.* 2>/dev/null || true
	@for f in svelte.config.*; do \
		[ -f "$$f" ] && echo "--- $$f ---" && sed -n '1,260p' "$$f" && echo ""; \
	done
	@echo "===== vite.config.* ====="
	@ls -1 vite.config.* 2>/dev/null || true
	@for f in vite.config.*; do \
		[ -f "$$f" ] && echo "--- $$f ---" && sed -n '1,260p' "$$f" && echo ""; \
	done
	@echo "===== tsconfig.json ====="
	@[ -f tsconfig.json ] && sed -n '1,260p' tsconfig.json || true

overview: ## Quick repo overview (tree + routes + pkg-overview)
	@$(MAKE) tree
	@echo ""
	@$(MAKE) routes
	@echo ""
	@$(MAKE) pkg-overview

search: ## Grep the repo: make search PATTERN="..."
	@if [ -z "$(PATTERN)" ]; then \
		echo "Usage: make search PATTERN='something'"; \
		exit 2; \
	fi
	grep -RIn \
		--exclude-dir=node_modules --exclude-dir=.svelte-kit --exclude-dir=build --exclude-dir=dist --exclude-dir=.git \
		-- "$(PATTERN)" src
