describe('~[E2E] Product Controller', function () {


	it('should be able a create product', async function () {
		const input = {
			name: 'Product 1',
			price: 10.0
		};
		const response = await fetch('http://localhost:3000/product', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(input),
		});
		expect(response.status).toBe(200);
		const data = await response.json();
		expect(data.id).toBeDefined();
	});

	it('should be able find product', async function () {
		const input = {
			name: 'Product 1',
			price: 10.0
		};
		const response1 = await fetch('http://localhost:3000/product', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(input),
		});
		expect(response1.status).toBe(200);
		const output1 = await response1.json();
		expect(output1.id).toBeDefined();
		const response2 = await fetch(`http://localhost:3000/product/${output1.id}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			}
		});
		expect(response2.status).toBe(200);
		const output2 = await response2.json();
		expect(output2.id).toBeDefined();
		expect(output2.name).toBe(input.name);
		expect(output2.price).toBe(input.price);
	});

});
