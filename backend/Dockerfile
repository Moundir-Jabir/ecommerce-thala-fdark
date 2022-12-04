FROM node:current-alpine
ENV PORT=4000
ENV JWT_SECRET=hkdhksqdjhhsqhkhjkhdkjqshdkhqsd
ENV EMAIL=elmondhirjabir@gmail.com
ENV PASSWORDEMAIL=qhgeglbnfxqelacq
ENV HOSTNAME=http://localhost:4000
ENV FRONTENDHOSTNAME=http://localhost:3000
ENV DATABASE_NAME=ecommerce
ENV DATABASE_USERNAME=root
ENV DATABASE_PASSWORD=root
ENV DATABASE_HOST=db
ENV DATABASE_PORT=5432
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
CMD ["npm", "start"]