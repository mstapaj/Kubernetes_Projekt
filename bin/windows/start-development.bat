@kubectl apply -f ../../development/my-development-namespace.yaml
@kubectl apply -f ../../development/configmaps/
@kubectl apply -f ../../development/services/
@kubectl apply -f ../../development/volumes/
@timeout /t 10 /nobreak
@kubectl apply -f ../../development/volumeclaims/
@kubectl apply -f ../../development/deployments/
@kubectl apply -f ../../development/my-ingress.yaml