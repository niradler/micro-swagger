aws apigateway get-rest-apis | jq '.items[].id' | sed s/\"// | sed s/\”// > apigateway-ids.txt

for i in $(apigateway-ids); 
do aws apigateway get-export --parameters extensions='postman' --rest-api-id $i --stage-name prod --export-type swagger ./data/prod/$i.json;
echo $i ;
done ;
