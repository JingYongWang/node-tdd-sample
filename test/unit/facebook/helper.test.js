//參考 https://github.com/sakuxz/node-tdd-sample

import FacebookHelper from '../../../src/facebook/helper.js'
import task1_initModel from '../../../src/database/task1'

describe('facebook-helper', () => {
  let facebookHelper = null;
  let models = null;


  before( async (done) => {
    //自己的ID和Token
    let userId = "648070781944220";
    let token = "EAACEdEose0cBAKK2CLQQCuRPmTNQcwZCXDnsZAfGZAY6K8KaRXFMyuoNnDhahoCmo4cYVBTVzfQkKbKU56DCwBbuZAD4Tef62vR1myWBrPptaSliIUnv4f9pZCJsKWSSwmJ0sZAkOuPdGxnLKmXfNOC5zOgLpJunvayjzW2lriUwZDZD";
    facebookHelper = new FacebookHelper({userId, token});
    models = await task1_initModel();
    console.log(facebookHelper);
    done();
  });
  //Item1:把從 facebook 取得的 friends list 存入 sequelize 之 friend model (create)
  it("get frineds list and save in database", async (done) => {
     try {
         let friends = await facebookHelper.getFriends();
         console.log("friends",friends);
         (friends != null ).should.be.true;
         friends.should.be.Array;
         friends[0].should.have.keys("name","id");

         friends.forEach((e,i) => {
            e.facebookId = e.id;
            e.email = e.undefined;
         });

         await models.friend.bulkCreate(friends);
         done();

     } catch (e) {
         done(e);
     }
  });

  //Item2:原本用 api 取得 friends list 改為透過查詢資料庫的方式 (find)
  it.only("get friends list database", async (done) => {
    try {
      let friends = await models.friend.findAll();
      friends.should.be.Array;
      friends[0].toJSON().should.has.keys(
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
        let friend = await models.friend.findOne();
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
