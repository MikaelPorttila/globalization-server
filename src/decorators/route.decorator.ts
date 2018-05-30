export function route(path:string){
	return function(target: any, propertyKey: string, descriptor: PropertyDescriptor){
		console.log('decorator invoked');
		//TODO: (Mikael) pre-register all methods to a known variable which is then processed by the controller.ts-file.
	}
}