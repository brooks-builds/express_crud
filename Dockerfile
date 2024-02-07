FROM node:20
ENV PORT=3000
ENV DB_URI=postgres://postgres:keyboardcat@express_crud_pg/postgres
RUN mkdir /code
RUN useradd -d /code -M code
RUN chown code:code /code
EXPOSE 3000
WORKDIR /code
HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 CMD curl -f http://localhost:3000/healthcheck
COPY --chown=code:code . /code
USER code
CMD [ "npm", "run", "dev" ]