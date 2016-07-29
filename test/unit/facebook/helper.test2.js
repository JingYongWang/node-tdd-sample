import task1_initModel from '../../../src/database/task1';

describe('create fb list', () => {
 let models = null;
 let userList1 = [];
 beforeEach(async (done) => {
   try {
     models = await task1_initModel();
     userList1 = [
       { name: '周定緯',  facebookId: "1170848322", email: 'test1@gmail.com' },
       { username: '林澤宇', facebookId: "1358898365", email: 'test2@gmail.com' },
       { username: 'Vicky Vendy', facebookId: "1681776674", email: 'test3@gmail.com'},
       { username: 'Nancy Lin', facebookId: "774994365846339", email: 'test4@yahoo.com.tw' },
     ];
     await models.Friend.bulkCreate(userList1);
     done();
   } catch (e) {
     done(e);
   }
 });

 it('一次創建多組 user', async (done) => {
   try {
     const userList2 = [
       { name: '周定緯',  facebookId: "1170848322", email: 'test1@gmail.com' },
       { username: '林澤宇', facebookId: "1358898365", email: 'test2@gmail.com' },
       { username: 'Vicky Vendy', facebookId: "1681776674", email: 'test3@gmail.com'},
       { username: 'Nancy Lin', facebookId: "774994365846339", email: 'test4@yahoo.com.tw' },
     ];
     await models.Friend.bulkCreate(userList2);

     const check = await models.Friend.findAll();
     check.length.should.be.eq(userList1.length + userList2.length);

     done();
   } catch (e) {
     done(e);
   }
 });
});

 describe('test fb list', () => {
   let models = null;
   let friend = null;
   beforeEach(async (done) => {
     try {
       models = await task1_initModel();
       const addFriend = {
         name: '周定緯',
         facebookId: '1170848322',
         email: 'test@gmail.com'
       }
       friend = await models.Friend.create(addFriend);
       done()
     } catch (e) {
       done(e)
     }
   });

 it('update friend email', async (done) => {
     try {
       const newEmail = 'hellojs@trunk.studio';
       let result = {};
       result = await models.Friend.findOne({
         where: {
           email: friend.email,

       },
       });
       result.email = newEmail;
       await result.save();
       result.email.should.be.eq(newEmail);
       done();
     } catch (e) {
       done(e);
     }
   });

    it('destroy friend', async (done) => {
     try {;
       let result = {};
       result = await models.Friend.findOne({
         where: {
           email: friend.email,
         },
       });
       await result.destroy();

       const check = await models.Friend.findOne({
         where: {
           email: friend.email,
         },
       });
       (check === null).should.be.true;
       done();
     } catch (e) {
       done(e);
     }
   });


 });
