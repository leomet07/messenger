@echo off

call cd client

call npm run build

call firebase deploy

call cd ..
