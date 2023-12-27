FROM gradle:latest AS build

WORKDIR /app/

ENV PATH /app/node_modules/.bin:$PATH

COPY ./client/ /app/

RUN gradle build --no-daemon --info --stacktrace

FROM ruby:3.2.2 AS server

COPY ./api/Gemfile .

COPY ./api/Gemfile.lock .

RUN bundle install

COPY ./api/entrypoint.sh /usr/bin/

COPY ./api /app

COPY --from=build /app/public/ /app/public/

RUN chmod +x /usr/bin/entrypoint.sh

ENTRYPOINT ["entrypoint.sh"]

EXPOSE 3000

CMD [ "bundle", "exec", "rails", "s", "-e", "production" ]
