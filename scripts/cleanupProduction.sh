#!/bin/bash

# Get the list of running container IDs from image 'divvly-cp-production'
container_ids=$(sudo docker ps -a -q -f ancestor=divvly-cp-production)

# Check if there are any containers from 'divvly-cp-production'
if [ -n "$container_ids" ]; then
    echo "Stopping and removing containers from image 'divvly-cp-production'..."
    sudo docker stop $container_ids
    sudo docker rm $container_ids
else
    echo "No containers from image 'divvly-cp-production' found."
fi

# Get the image ID of 'divvly-cp-production'
image_id=$(sudo docker images -q divvly-cp-production)

# Check if the image 'divvly-cp-production' exists
if [ -n "$image_id" ]; then
    echo "Removing image 'divvly-cp-production'..."
    sudo docker rmi $image_id
else
    echo "Image 'divvly-cp-production' not found."
fi
