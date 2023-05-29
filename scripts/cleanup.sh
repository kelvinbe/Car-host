#!/bin/bash

# Get the list of running container IDs from image 'divvly-cp'
container_ids=$(sudo docker ps -a -q -f ancestor=divvly-cp)

# Check if there are any containers from 'divvly-cp'
if [ -n "$container_ids" ]; then
    echo "Stopping and removing containers from image 'divvly-cp'..."
    sudo docker stop $container_ids
    sudo docker rm $container_ids
else
    echo "No containers from image 'divvly-cp' found."
fi

# Get the image ID of 'divvly-cp'
image_id=$(sudo docker images -q divvly-cp)

# Check if the image 'divvly-cp' exists
if [ -n "$image_id" ]; then
    echo "Removing image 'divvly-cp'..."
    sudo docker rmi $image_id
else
    echo "Image 'divvly-cp' not found."
fi
