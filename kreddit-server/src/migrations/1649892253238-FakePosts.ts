import { MigrationInterface, QueryRunner } from 'typeorm';

export class FakePosts1649892253238 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    insert into post (title, body, subforum, "creatorId") values ('Watcher in the Woods, The', 'In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.

    Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.', 'Books', 1);
    insert into post (title, body, subforum, "creatorId") values ('Hard Way, The', 'Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.
    
    Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.', 'Books', 1);
    insert into post (title, body, subforum, "creatorId") values ('East Palace West Palace (Dong gong xi gong)', 'Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.', 'Books', 1);
    insert into post (title, body, subforum, "creatorId") values ('Caribe', 'Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.
    
    In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.', 'Books', 1);
    insert into post (title, body, subforum, "creatorId") values ('Thor: The Dark World', 'Sed ante. Vivamus tortor. Duis mattis egestas metus.
    
    Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.
    
    Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.', 'Movies', 1);
    insert into post (title, body, subforum, "creatorId") values ('The Night Evelyn Came Out of the Grave', 'Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.
    
    Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.
    
    In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.', 'Books', 1);
    insert into post (title, body, subforum, "creatorId") values ('Teachers', 'Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.', 'Books', 1);
    insert into post (title, body, subforum, "creatorId") values ('Taste the Blood of Dracula', 'Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.
    
    Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.
    
    Phasellus in felis. Donec semper sapien a libero. Nam dui.', 'Movies', 1);
    insert into post (title, body, subforum, "creatorId") values ('2 Days in the Valley', 'Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
    
    Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.', 'Books', 1);
    insert into post (title, body, subforum, "creatorId") values ('Amish Grace', 'Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.
    
    Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.
    
    Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.', 'Tech', 1);
    insert into post (title, body, subforum, "creatorId") values ('Moon Warriors, The (Zhan shen chuan shuo)', 'Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.
    
    Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.
    
    Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.', 'Books', 1);
    insert into post (title, body, subforum, "creatorId") values ('Beautiful Boxer', 'Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.
    
    Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
    
    Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.', 'Movies', 1);
    insert into post (title, body, subforum, "creatorId") values ('I''m with Lucy', 'Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.
    
    Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.', 'Movies', 1);
    insert into post (title, body, subforum, "creatorId") values ('Chinese Ghost Story II, A (Sien nui yau wan II yan gaan do)', 'Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.
    
    Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.', 'Tech', 1);
    insert into post (title, body, subforum, "creatorId") values ('Marriage Italian Style (Matrimonio all''italiana)', 'Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.
    
    Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.', 'Movies', 1);
    insert into post (title, body, subforum, "creatorId") values ('Elizabeth: The Golden Age', 'Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.
    
    Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.', 'Movies', 1);
    insert into post (title, body, subforum, "creatorId") values ('The Woman in Black 2: Angel of Death', 'Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.', 'Books', 1);
    insert into post (title, body, subforum, "creatorId") values ('Real Fiction (Shilje sanghwang)', 'Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.
    
    Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.', 'Books', 1);
    insert into post (title, body, subforum, "creatorId") values ('Regret to Inform', 'Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.
    
    Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.
    
    Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.', 'Code', 1);
    insert into post (title, body, subforum, "creatorId") values ('Half Moon (a.k.a. Niwemang)', 'Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.', 'Code', 1);
    insert into post (title, body, subforum, "creatorId") values ('We Need to Talk About Kevin', 'Sed ante. Vivamus tortor. Duis mattis egestas metus.
    
    Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.
    
    Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.', 'Tech', 1);
    insert into post (title, body, subforum, "creatorId") values ('Kidulthood', 'Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.
    
    In congue. Etiam justo. Etiam pretium iaculis justo.
    
    In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.', 'Tech', 1);
    insert into post (title, body, subforum, "creatorId") values ('Losers, The', 'Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.
    
    In congue. Etiam justo. Etiam pretium iaculis justo.', 'Code', 1);
    insert into post (title, body, subforum, "creatorId") values ('Venus Wars (Venus Senki)', 'In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.
    
    Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.
    
    Sed ante. Vivamus tortor. Duis mattis egestas metus.', 'Tech', 1);
    insert into post (title, body, subforum, "creatorId") values ('You Can''t Win ''Em All', 'Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.', 'Tech', 1);
    insert into post (title, body, subforum, "creatorId") values ('Keep Your Right Up', 'In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.
    
    Nulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.', 'Tech', 1);
    insert into post (title, body, subforum, "creatorId") values ('Sky Fighters (Les Chevaliers Du Ciel)', 'Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.', 'Tech', 1);
    insert into post (title, body, subforum, "creatorId") values ('No Man of Her Own ', 'In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.
    
    Nulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.
    
    Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.', 'Tech', 1);
    insert into post (title, body, subforum, "creatorId") values ('Quo Vadis, Baby?', 'Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.', 'Books', 1);
    insert into post (title, body, subforum, "creatorId") values ('Munchies', 'Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.
    
    Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.
    
    Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.', 'Movies', 1);
    insert into post (title, body, subforum, "creatorId") values ('Muppet Christmas Carol, The', 'Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.
    
    Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.', 'Code', 1);
    insert into post (title, body, subforum, "creatorId") values ('Tell Them Who You Are', 'Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.', 'Code', 1);
    insert into post (title, body, subforum, "creatorId") values ('Far Cry', 'Phasellus in felis. Donec semper sapien a libero. Nam dui.
    
    Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.
    
    Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.', 'Books', 1);
    insert into post (title, body, subforum, "creatorId") values ('Tree Grows in Brooklyn, A', 'Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.
    
    Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.
    
    Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.', 'Code', 1);
    insert into post (title, body, subforum, "creatorId") values ('Rent-A-Cop', 'In congue. Etiam justo. Etiam pretium iaculis justo.', 'Tech', 1);
    insert into post (title, body, subforum, "creatorId") values ('Washington Heights', 'Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.', 'Tech', 1);
    insert into post (title, body, subforum, "creatorId") values ('Intersection', 'Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.
    
    Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.', 'Books', 1);
    insert into post (title, body, subforum, "creatorId") values ('Holcroft Covenant, The', 'Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
    
    Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.
    
    Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.', 'Books', 1);
    insert into post (title, body, subforum, "creatorId") values ('Wind Will Carry Us, The (Bad ma ra khahad bord)', 'Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.
    
    Fusce consequat. Nulla nisl. Nunc nisl.', 'Tech', 1);
    insert into post (title, body, subforum, "creatorId") values ('The Last Diamond', 'In congue. Etiam justo. Etiam pretium iaculis justo.', 'Code', 1);
    insert into post (title, body, subforum, "creatorId") values ('Vieraalla maalla', 'Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.
    
    Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.', 'Code', 1);
    insert into post (title, body, subforum, "creatorId") values ('Murder by Proxy: How America Went Postal', 'Phasellus in felis. Donec semper sapien a libero. Nam dui.', 'Movies', 1);
    insert into post (title, body, subforum, "creatorId") values ('Grave Secrets (Silent Screams)', 'In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.
    
    Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.
    
    Sed ante. Vivamus tortor. Duis mattis egestas metus.', 'Tech', 1);
    insert into post (title, body, subforum, "creatorId") values ('Lost and Found', 'Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.
    
    Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.', 'Movies', 1);
    insert into post (title, body, subforum, "creatorId") values ('Annie Get Your Gun', 'Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.', 'Tech', 1);
    insert into post (title, body, subforum, "creatorId") values ('Black Coal, Thin Ice (Bai ri yan huo)', 'In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.
    
    Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.
    
    Sed ante. Vivamus tortor. Duis mattis egestas metus.', 'Movies', 1);
    insert into post (title, body, subforum, "creatorId") values ('Wilby Wonderful', 'Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.', 'Books', 1);
    insert into post (title, body, subforum, "creatorId") values ('Hellsinki (Rööperi)', 'Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.', 'Movies', 1);
    insert into post (title, body, subforum, "creatorId") values ('Scarlet Dove, The (Tulipunainen kyyhkynen)', 'Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.
    
    In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.
    
    Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.', 'Books', 1);
    insert into post (title, body, subforum, "creatorId") values ('Anatomy of a Murder', 'Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.
    
    Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.', 'Code', 1);
    
    `);
  }

  public async down(_queryRunner: QueryRunner): Promise<void> {}
}
