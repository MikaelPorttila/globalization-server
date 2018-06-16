import * as guidv1 from 'uuid/v1'

export default function guid(): string {
	const result = guidv1();
	return result;
}