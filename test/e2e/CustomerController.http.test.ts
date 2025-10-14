describe('~[E2E] Customer Controller', function () {

	it('should be able a create customer', async function () {
		const input = {
			name: "John",
			address: {
				street: "Street",
				number: 1,
				zip: "00000-000",
				city: "City"
			}
		}
		const response = await fetch('http://localhost:3000/customer', {
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

	it('should be able find customer', async function () {
		const input = {
			name: "John",
			address: {
				street: "Street",
				number: 1,
				zip: "00000-000",
				city: "City"
			}
		}
		const response1 = await fetch('http://localhost:3000/customer', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(input),
		});
		expect(response1.status).toBe(200);
		const output1 = await response1.json();
		expect(output1.id).toBeDefined();
		const response2 = await fetch(`http://localhost:3000/customer/${output1.id}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			}
		});
		expect(response2.status).toBe(200);
		const output2 = await response2.json();
		expect(output2.id).toBeDefined();
		expect(output2.name).toBe(input.name);
		expect(output2.address.street).toBe(input.address.street);
		expect(output2.address.number).toBe(input.address.number);
		expect(output2.address.zip).toBe(input.address.zip);
		expect(output2.address.city).toBe(input.address.city);
	});

});
