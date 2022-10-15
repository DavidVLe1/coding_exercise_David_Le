### Objective
Write a script to read the provided JSON files in the data directory and then deposit a list of users into our HubSpot account using the API.


### Requirements
Your solution should consider the following criteria:
 - Users in the deposit list have an association to a property with status value of `deactivated`.
 - User `properties` in the POST should include first name, last name, company, company website, email, phone 


Once you've got the list you want to deposit ready you'll want to have a look at the HubSpot documentation and decide which endpoint you'll want your implementation to make use of.

Create or Update
https://legacydocs.hubspot.com/docs/methods/contacts/create_or_update

Batch Create or Update
https://legacydocs.hubspot.com/docs/methods/contacts/batch_create_or_update


Once you have the HubSpot contact IDs you'll complete the final step by adding them to a contact list

Post list of contact IDs to 
https://legacydocs.hubspot.com/docs/methods/lists/add_contact_to_list


### Assumptions for working with HubSpot
- You have access to a HubSpot Class/Object
	- This object handles OAuth for you on construction
	- You have access to a HubSpot Class method 'api_call' which accepts
		- (srting) url - the URL of the endpoint you would like to send a request to 
		- (string) request_type - the type of request you want to invoke "GET", "POST", "PUT", etc.
		- (string) req_data - any stringified data you would like to include in your request
- You can assume you'll receive the appropriate success response and VIDs from whichever create/update endpoint you choose.
- A list for these deactivated users already exists with the ID 202210