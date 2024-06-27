package lt.bookbyte.book_byte.Config;

import lt.bookbyte.book_byte.entity.Role;
import lt.bookbyte.book_byte.entity.User;
import lt.bookbyte.book_byte.repository.RoleRepository;
import lt.bookbyte.book_byte.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Configuration
public class DataInitializer {
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Bean
    public CommandLineRunner initRoles(RoleRepository roleRepository, UserRepository userRepository) {
        return args -> {
            Role adminRole = roleRepository.findByName("ROLE_ADMIN");
            if (adminRole == null) {
                adminRole = new Role();
                adminRole.setName("ROLE_ADMIN");
            }

            Set<Role> roles = new HashSet<>();
            roles.add(adminRole);


            if (!userRepository.existsByUsername("admin")) {
                User adminUser = new User();
                adminUser.setUsername("admin");
                adminUser.setEmail("admin@admin.com");
                adminUser.setPassword(passwordEncoder.encode("admin"));
                adminUser.setRoles(roles);
                userRepository.save(adminUser);
            }
        };
    }
}