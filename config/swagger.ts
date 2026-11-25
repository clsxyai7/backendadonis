import path from 'node:path'
import url from 'node:url'
export default {
path: path.dirname(url.fileURLToPath(import.meta.url)) + '/../',
tagIndex: 1, // Passer à 2 si toutes les routes sont préfixées par /api
productionEnv: 'production', // optionnel
info: {
title: 'Suivi des élèves API',
version: '1.0.0',
description: "Documentation de l'API pour le suivi des élèves",
},
snakeCase: true,
debug: false, // Passer à true pour afficher les logs de débogage
ignore: ['/swagger', '/docs'],
preferredPutPatch: 'PUT', // Préfère PUT si PUT et PATCH coexistent
common: {
parameters: {}, // Paramètres OpenAPI réutilisables
headers: {},    
// En-têtes OpenAPI réutilisables
},
defaultSecurityScheme: 'BearerAuth',
persistAuthorization: true, // Conserve le token après rechargement de la page
showFullPath: false,
}