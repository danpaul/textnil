{
  "query" : "start x  = node:node_auto_index(name={startName}) match path = (x-[r]-friend) where friend.name = {name} return TYPE(r)",
  "params" : {
    "startName" : "I",
    "name" : "you"
  }
}