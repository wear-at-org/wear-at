package com.side.wearat.service;

import com.side.wearat.entity.User;
import com.side.wearat.model.user.UserRequest;
import com.side.wearat.repository.UserRepository;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.List;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

@RunWith(SpringRunner.class)
@DataJpaTest
@ActiveProfiles("test")
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
public class UserServiceTest {

    @Autowired
    private UserRepository userRepository;

    @Test
    public void testUser() {
        UserService userService = new UserServiceImpl(userRepository);

        List<User> users1 = userService.listUsers();

        UserRequest req = new UserRequest("test", "testemail");
        var user1 = userService.createUser(req);

        UserRequest req2 = new UserRequest("test2", "testemail2");
        var user2 = userService.createUser(req2);

        List<User> users = userService.listUsers();

        assertEquals(users.size(), 2);

        var getUser1 = userService.getUser(user1.getId());
        assertTrue(getUser1.isPresent());
        var getUser2 = userService.getUser(9999L);
        assertTrue(!getUser2.isPresent());
    }
}
