FROM node:20

# The command after RUN will run when creating an image
# Also each RUN will be in it's own Docker layer. Each layer is cached, so if it has been created before, the layer will NOT be created again the next time we build.
RUN touch /hello
RUN echo "hello world" > /hello

# The port that we want to expose to the host from the container
EXPOSE 3000

# Environment variables we want to have set in the containers.
# Since these are hard coded into the image, and we are pushing these to GitHub make sure we aren't exposing real secrets here by accident
# We can still add new environment variables with the -e option when creating a container
ENV PORT=3000
ENV DB_URI=postgres://postgres:keyboardcat@express_crud_pg/postgres

# Create a directory that meant to be a mount point for a volume. 
# The volume will still need to be attached when we create the container.
VOLUME [ "/code" ]

# Create the User that is NOT root that will be running our code.
# We'll give it the /code home directory that we already created
RUN useradd -d /code -M code
USER code

# copy in our code so that we have an initial version of the code.
# this works closely with watch in the compose file so that when files are updated
# they will be synced.
COPY --chown=code:code . /code

# Everything after this line will now be executed from the given directory
# This includes commands when creating the docker container
WORKDIR /code


# When creating a container we have the option of having it do a healthcheck
# In this case the healthcheck will run the following command 5 seconds after the containers starts (to give the container a chance to get going).
# If the command fails it will wait 30 seconds and try again up to 3 times.
# The health of the container can be viewed in the docker ps output
HEALTHCHECK --interval=30s \
    --timeout=30s \
    --start-period=5s \
    --retries=3 \
    CMD curl -f http://localhost:3000/healthcheck || exit 1

# The command that we want to run by default when we create a container.
CMD [ "npm", "run", "dev" ]
