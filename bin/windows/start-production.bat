@kubectl apply -f ../../production/my-production-namespace.yaml
@kubectl apply -f ../../production/configmaps/
@kubectl apply -f ../../production/services/
@kubectl apply -f ../../production/volumes/
@timeout /t 10 /nobreak
@kubectl apply -f ../../production/volumeclaims/
@kubectl apply -f ../../production/deployments/
@kubectl apply -f ../../production/my-ingress.yaml