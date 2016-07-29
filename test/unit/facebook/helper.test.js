//參考 https://github.com/sakuxz/node-tdd-sample


import FacebookHelper from '../../../src/facebook/helper.js'
import task1_initModel from '../../../src/models/friend.js'

describe('facebook-helper', () => {
  let facebookHelper = null;
  let models = null;


  before((done) => {
    let userId = "648070781944220";
    let token = "EAACEdEose0cBAOOvpn09BDHRyBakotSsbsljJJvS4IYzduLbAj6rhFZARrnd1lt7a7OU1qleZC5nDBKEUuyKilqYYYmjvQGyKunM140IDi4hTq1X5NJGM6HAVsVT1rVzZB2A4WhTRA7RnQu8XjqqQYlJdScQyRwfhSCXoe6iQZDZD";
    facebookHelper = new FacebookHelper({userId, token});
    console.log(facebookHelper);
    done();
  });
  //把從 facebook 取得的 friends list 存入 sequelize 之 friend model (create)
  it.only("get frineds list and save in database", async (done) => {
     try {
         let friends = await facebookHelper.getFriends();
         console.log("friends",friends);
         (friends != null ).should.be.true;
         friends.should.be.Array;
         friends[0].should.have.keys('name','id');

         friends.foreach((e,i) =>{
            e.facebookId = e.id;
            e.email = e.undefined;
         });
         await models.friends.bulkCreate(friends);
         done();

     } catch (e) {
         done(e);
     }
  });
  //把從 facebook 取得的 friends list 存入 sequelize 之 friend model (create)
  it("get friends list database", async (done) => {
    try {
      let friends = await models.friends.findAll();
      friends.should.be.Array;
      friends[0].toJSON.should.has.keys(
          'id',
          'name',
          'email',
          'facebookId',
          'createdAt',
          'updatedAt'
      );
      done();
    } catch (e) {
      done(e);
    }
  });
  //原本用 api 取得 friends list 改為透過查詢資料庫的方式 (find)
  it("get friends list in database", async (done) => {
    try {
      let friends = await facebookHelper.getFriends();
      console.log("friends", friends);
      (friends != null).should.be.true;
      friends.should.be.Array;
      friends[0].should.have.keys("name", "id");
      done();
    } catch (e) {
      done(e);
    }
  });
  //將其中一個 friend 更新其 email 欄位為 hellojs@trunk.studio (update)
  it('update friends emails', async (done) => {
      try {
        let friend = await models.friends.findOne();
        friend.email = 'hellojs@trunk.studio';
        let result = await modele.friends.
        done();
      } catch (e) {
        done(e);
      }
  });
  //刪除該位 friend (delete)
  it('delete the  email who has hellojs@trunk.studio in database   ', async (done) => {
    try {
        let friends = await models.friends.findOne({
            where : {
                email:  'hellojs@trunk.studio'
            }
        });
        (result != null ).should.be.true;
        done();
    } catch (e) {
        done(e);
    }
  });

  it.skip("publish post", async (done) => {
    try {
      let post = {
        message: 'test facebook post api'
      }
      let result = await facebookHelper.publishPost(post);
      console.log("result", result);
      done();
    } catch (e) {
      done(e);
    }
  });
});
