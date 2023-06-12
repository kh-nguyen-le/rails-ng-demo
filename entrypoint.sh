#!/bin/bash
set -e

# # Remove a potentially pre-existing server.pid for Rails.
rm -f /app/tmp/pids/server.pid

if [ "$RAILS_ENV" = "production" ]; then \
    bundle exec rails db:prepare && \
    bundle exec rails db:seed && \
    bundle exec rails s -e production; \
  else \
    bundle exec rails s -b "0.0.0.0"; \
fi