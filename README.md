# hello-remote-api

## Json data Hack

To convert the id from objectID do:

```sh
cat data.json | | jq ' .[] | .user_id=(.user_id."$oid")' > result.json
```

``` sh
cat data.json | jq -r '.[] | .user_id=(.user_id."$oid")' > result.json
```

```sh
cat old-recruiter.mockData.json | jq ' .[] | .user_id=(.user_id."$oid")' > result.json
```
