FROM nginx:stable-alpine

COPY html /etc/nginx/html

COPY nginx.conf /etc/nginx/nginx.conf
COPY ssl/nginx.crt /etc/nginx/ssl/nginx.crt
COPY ssl/nginx.key /etc/nginx/ssl/nginx.key


CMD ["nginx"]