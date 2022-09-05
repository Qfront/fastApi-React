import pymongo
client = pymongo.MongoClient("localhost", 27017)

# SiteTest - DB, UsersData - Collection
db = client.SiteTest.UsersData
