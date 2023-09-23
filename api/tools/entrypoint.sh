echo "Starting specific packages install"
npm install
npm rebuild bcrypt --build-from-source
npm run dev
