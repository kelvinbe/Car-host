#!/bin/bash

# Get the list of running container IDs from image 'divvly-cp-staging'
container_ids=$(sudo docker ps -a -q -f ancestor=divvly-cp-staging)

# Check if there are any containers from 'divvly-cp-staging'
if [ -n "$container_ids" ]; then
    echo "Stopping and removing containers from image 'divvly-cp-staging'..."
    sudo docker stop $container_ids
    sudo docker rm $container_ids
else
    echo "No containers from image 'divvly-cp-staging' found."
fi

# Get the image ID of 'divvly-cp-staging'
image_id=$(sudo docker images -q divvly-cp-staging)

# Check if the image 'divvly-cp-staging' exists
if [ -n "$image_id" ]; then
    echo "Removing image 'divvly-cp-staging'..."
    sudo docker rmi $image_id
else
    echo "Image 'divvly-cp-staging' not found."
fi
