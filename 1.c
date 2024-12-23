#include <stdio.h>

// Function prototypes
unsigned char is_prime(unsigned char num);
void extract_primes(unsigned char *primes, unsigned char *count);

int main(void) {
    unsigned char prime_numbers[32]; // Array to store extracted prime numbers
    unsigned char prime_count = 0;   // Counter for prime numbers

    // Extract prime numbers
    extract_primes(prime_numbers, &prime_count);

    // Print the prime numbers found
    printf("\nFound %d prime numbers:\n", prime_count);
    for (unsigned char i = 0; i < prime_count; i++) {
        printf("%02X ", prime_numbers[i]);
    }
    printf("\n");

    return 0;
}

// Subroutine to check if a number is prime
unsigned char is_prime(unsigned char num) {
    unsigned char i;

    if (num < 2) {
        return 0; // Not prime if less than 2
    }

    for (i = 2; i * i <= num; i++) {
        if (num % i == 0) {
            return 0; // Not prime if divisible
        }
    }

    return 1; // Prime number
}

// Subroutine to extract prime numbers
void extract_primes(unsigned char *primes, unsigned char *count) {
    unsigned char i;

    *count = 0; // Initialize prime count

    for (i = 0; i <= 0x20; i++) { // Loop from 0 to 32
        if (is_prime(i)) {
            primes[*count] = i; // Store prime number
            (*count)++;
        }
    }
}
