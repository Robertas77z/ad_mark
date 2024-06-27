package lt.bookbyte.book_byte.service;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import lt.bookbyte.book_byte.dto.LoginDto;
import lt.bookbyte.book_byte.dto.RegisterDto;
import lt.bookbyte.book_byte.entity.Role;
import lt.bookbyte.book_byte.entity.User;
import lt.bookbyte.book_byte.exeption.BookByteAPIExeption;
import lt.bookbyte.book_byte.repository.RoleRepository;
import lt.bookbyte.book_byte.repository.UserRepository;
import lt.bookbyte.book_byte.security.JwtTokenProvider;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
@AllArgsConstructor
public class AuthServiceImpl  implements AuthService{

    private UserRepository userRepository;
    private RoleRepository roleRepository;
    private PasswordEncoder passwordEncoder;
    private AuthenticationManager authenticationManager;
    private JwtTokenProvider jwtTokenProvider;
    @Override
    @Transactional
    public String register(RegisterDto registerDto) {

        // check username is already exists in database
        if (userRepository.existsByUsername(registerDto.getUsername())){
            throw new BookByteAPIExeption(HttpStatus.BAD_REQUEST, "Username already exists!");
        }

        //check email is already exists in database
        if (userRepository.existsByEmail(registerDto.getEmail())){
            throw new BookByteAPIExeption(HttpStatus.BAD_REQUEST,"Email is already exists!");
        }

        //Create new user

        User user = new User();
        user.setUsername(registerDto.getUsername());
        user.setEmail(registerDto.getEmail());
        user.setPassword(passwordEncoder.encode(registerDto.getPassword()));

        //Set roles

        Set<Role> roles = new HashSet<>();
        Role userRole = roleRepository.findByName("ROLE_USER");
        if (userRole == null) {
            // If role not found, you might need to create it
            userRole = new Role();
            userRole.setName("ROLE_USER");
            roleRepository.save(userRole);
        }
        roles.add(userRole);
        user.setRoles(roles);

        //Save user in the repository
        userRepository.save(user);

        return "User Registered Successfully!. ";
    }

    @Override
    public String login(LoginDto loginDto) {

        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                loginDto.getUsernameOrEmail(),
                loginDto.getPassword()
        ));

        SecurityContextHolder.getContext().setAuthentication(authentication);

        String token = jwtTokenProvider.generateToken(authentication);


        return token;
    }
}
