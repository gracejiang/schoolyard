cd /home/ec2-user/schoolyard
cp /var/app-secrets/.env ./backend/.env

cd backend
npm install
npm start &

cd ../frontend
npm install
npm build
cp build /var/www/react/

cd ../