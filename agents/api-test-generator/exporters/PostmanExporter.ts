// import fs from 'fs';
// import path from 'path';
// import { ApiEndpoint } from '../parsers/ApiSpecParser';
//
// export class PostmanExporter {
//     public static export(endpoints: ApiEndpoint[], outputPath: string): void {
//         const collection = {
//             info: {
//                 name: 'Generated API Collection',
//                 schema: 'https://schema.getpostman.com/json/collection/v2.1.0/collection.json',
//             },
//             item: endpoints.map((ep) => ({
//                 name: `${ep.method} ${ep.path}`,
//                 request: {
//                     method: ep.method,
//                     header: [],
//                     url: {
//                         raw: `{{baseUrl}}${ep.path}`,
//                         host: ['{{baseUrl}}'],
//                         path: ep.path.slice(1).split('/'),
//                     },
//                 },
//             })),
//         };
//
//         fs.writeFileSync(outputPath, JSON.stringify(collection, null, 2));
//         console.log(`✅ Postman collection saved to ${outputPath}`);
//     }
// }
