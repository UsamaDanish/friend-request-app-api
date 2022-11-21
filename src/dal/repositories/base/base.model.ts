export interface MongoQueryModel {
  $gte?: any;
  $lte?: any;
  $in?: any[];
  $or?: any[];
  $and?: any[];
  $match?: any;
}

export interface Collection {
  path: string;
  select: string;
}
