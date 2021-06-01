const query = require('../sqldb/conn');
const bodyParser = require('body-parser')
const path = require('path')
const fs = require('fs')
const mdPath = path.resolve(__dirname, '../examples/docs')
const navConfig = path.resolve(__dirname, '../examples/leftNavConfig.json')
const compType = require('./componentType.json')

function getComponents () {
	query("SELECT * FROM components"
        ,function(err,vals,fields){
        if (err) {
            res.json({code:-1,message:'查询失败'});
            res.end();
            return;
        }
        if(vals.length>0){
	        for(i=0;i<vals.length;i++){
		        fs.writeFile(mdPath+'/'+vals[i].c_name+'.md',vals[i].c_md,function(err){
		        	if(err) throw err;
		        })
	        }
        }
    });
}

function getLeftSideNav(){
    var responseDate = {code:0,msg:'success',content:{}};
    query('SELECT * FROM develop_guide'
        ,function(err,vals,fields){
        if (err) {
            res.json({code:-1,message:err});
            res.end();
            return;
        }
        responseDate.content[compType['0']] = vals
        responseDate.content['组件'] = new Array()
        query('SELECT c_name,c_path,c_desc,compType_id FROM components ORDER BY component_id'
            ,function(err,vals,fields){
            if (err) {
                res.json({code:-1,message:'components表查询失败'});
                res.end();
                return;
            }
            console.log('query success \n');
            Object.keys(compType).forEach(function (val) {
                if(val != 0){
                    responseDate.content['组件'].push({desc:compType[val],path:"/component",items:[]})
                }
            })
            vals.forEach(function(item,index){
                if(item.compType_id != 0){
                    responseDate.content['组件'].forEach(function(comp,index){
                        if(comp.desc == compType[item.compType_id]){
                            comp['items'].push({name:item.c_name,desc:item.c_desc,path:item.c_path})
                        }
                    })
                }
            })
            fs.writeFile(navConfig,JSON.stringify(responseDate.content),function(err){
                if(err) throw err;
            })
        });
    })
}
//本地开发，数据库丢失的话可以暂时注销
// getComponents()
// getLeftSideNav()

//接口路由
exports.getLeftNav = function(req,res){
	var responseDate = {code:0,msg:'success',content:{}};
    query('SELECT * FROM develop_guide'
        ,function(err,vals,fields){
        if (err) {
            res.json({code:-1,message:err});
            res.end();
            return;
        }
        responseDate.content[compType['0']] = vals
        responseDate.content['组件'] = new Array()
        query('SELECT c_name,c_path,c_desc,compType_id FROM components ORDER BY compType_id'
            ,function(err,vals,fields){
            if (err) {
                res.json({code:-1,message:'components表查询失败'});
                res.end();
                return;
            }
            console.log('query success \n');
            Object.keys(compType).forEach(function (val) {
                if(val != 0){
                    responseDate.content['组件'].push({desc:compType[val],path:"/component",items:[]})
                }
            })
            vals.forEach(function(item,index){
                if(item.compType_id != 0){
                    responseDate.content['组件'].forEach(function(comp,index){
                        if(comp.desc == compType[item.compType_id]){
                            comp['items'].push({name:item.c_name,desc:item.c_desc,path:item.c_path})
                        }
                    })
                }
            })
            // responseDate.content["组件"] = vals;
            
            res.writeHead(200,{'Content-Type':'application/json;charset=utf-8'})
            res.end(JSON.stringify(responseDate))
        });
    })
}
exports.add = function(req,res){
	var data = req.body;
	var component_id = data.component_id==''?Math.floor(Math.random()*10000):data.component_id;
	query("SELECT * FROM components WHERE c_desc='"+data.name+"'"
        ,function(err,vals,fields){
        if (err) {
            res.json({code:-1,message:'查询失败'});
            res.end();
            return;
        }
        if(vals.length>0){
        	res.json({code:-1,message:'已存在相同组件'});
            res.end();
            return;
        }
		query('insert into components(component_id,developer,developer_gh,c_desc,c_name,c_path,c_md,compType_id)value("'+component_id+'","'+data.developer+'","'+data.developer_gh+'","'+data.desc+'","'+data.name+'","'+data.path+'","'+data.md+'","'+data.compType_id+'")'
	        ,function(err,vals,fields){
	        if (err) {
	            res.json({code:-1,message:err});
	            res.end();
	            return;
	        }
	        console.log('query success \n');
	        res.json({code:0,message:'插入成功'});
	        res.end();
	    });
    });
}
exports.updateComponent = function(req,res){
    var data = req.body;
    var responseDate = {code:0,msg:'success'};
    query('update components set component_id="'+data.component_id+'",developer="'+data.developer+'",developer_gh="'+data.developer_gh+'",c_desc="'+data.desc+'",c_name="'+data.name+'",c_path="'+data.path+'",c_md="'+data.md+'",compType_id="'+data.compType_id+'" where c_name="'+data.name+'"'
        ,function(err,vals,fields){
        if (err) {
            res.json({code:-1,msg:err});
            res.end();
            return;
        }
        res.json(responseDate)
        res.end()
    });
}
exports.getComponentByType = function(req,res){
	var data = req.body;
	var responseDate = {code:0,msg:'success',content:[]};
	query("SELECT component_id,c_desc FROM components WHERE compType_id='"+data.compType_id+"'"
        ,function(err,vals,fields){
        if (err) {
            res.json({code:-1,message:'查询失败'});
            res.end();
            return;
        }
        responseDate.content = vals
        res.json(responseDate)
        res.end()
    });
}
exports.getComponentByName = function(req,res){
    var data = req.body;
    var responseDate = {code:0,msg:'success',content:[]};
    query("SELECT * FROM components WHERE c_name='"+data.name+"'"
        ,function(err,vals,fields){
        if (err) {
            res.json({code:-1,message:'查询失败'});
            res.end();
            return;
        }
        responseDate.content = vals
        res.json(responseDate)
        res.end()
    });
}