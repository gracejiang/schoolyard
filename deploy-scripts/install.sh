cd /home/ec2-user/schoolyard
sudo chown ec2-user . -R
sudo chmod 755 . -R
cp ~/app-secrets/.env ./backend/.env

# install npm and node
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
. ~/.nvm/nvm.sh
nvm install v14.18.1

cd backend
npm install

cd ../frontend
npm install
npm run-script build

cd ../