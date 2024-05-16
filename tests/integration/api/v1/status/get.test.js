// Making one API call to use in all status test
const fetchStatus = async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  const responseBody = await response.json();
  return { response, responseBody };
};

test("GET to /api/v1/status should return 200", async () => {
  const { response } = await fetchStatus();
  expect(response.status).toBe(200);
});

test("GET to /api/v1/status should return updated_at in ISO format", async () => {
  const { responseBody } = await fetchStatus();
  const parsedUpdatedAt = new Date(responseBody.updated_at).toISOString();
  expect(responseBody.updated_at).toEqual(parsedUpdatedAt);
});

test("GET to /api/v1/status should return correct postgres versions", async () => {
  const { responseBody } = await fetchStatus();
  expect(responseBody.dependencies.database.version).toEqual("16.0");
});

test("GET to /api/v1/status should return correct max_connections", async () => {
  const { responseBody } = await fetchStatus();
  expect(responseBody.dependencies.database.max_connections).toEqual(100);
});

test("GET to /api/v1/status should return current connections", async () => {
  const { responseBody } = await fetchStatus();
  expect(responseBody.dependencies.database.opened_connections).toEqual(1);
});
