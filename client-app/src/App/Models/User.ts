
// public string DisplayName { get; set; }
// public string Token { get; set; }
// public string UserName { get; set; }
// public string Image { get; set; }
export interface User {
    displayName: string,
    token: string,
    userName: string,
    image?: string
}

// public string Email { get; set; }
// public string Password { get; set; }

// public string DisplayName? { get; set; }
// public string UserName? { get; set; }
export interface UserFormValues {
    email: string,
    password: string,
    displayName?: string,
    userName?: string
}
