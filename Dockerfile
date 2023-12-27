FROM gradle:latest AS build

WORKDIR /build/

ENV PATH /build/node_modules/.bin:$PATH

COPY ./client/ /build/

RUN gradle build --no-daemon --info --stacktrace

FROM ruby:3.2.2 AS server

RUN apt-get update -qq && apt-get install -y build-essential nodejs

COPY ./api/entrypoint.sh /usr/bin/

WORKDIR /rails/

ADD api/Gemfile* /rails

RUN bundle install

ADD api/ /rails

COPY --from=build /build/public/ ./public/

RUN chmod +x /usr/bin/entrypoint.sh

ENTRYPOINT ["entrypoint.sh"]

EXPOSE 3000

CMD [ "bundle", "exec", "rails", "s", "-e", "production" ]
