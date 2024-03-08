package main

type Student struct {
	ID                    int                    `json:"id" db:"id"`
	FirstName             string                 `json:"firstName" db:"first_name"`
	LastName              string                 `json:"lastName" db:"last_name"`
	Email                 string                 `json:"email" db:"email"`
	PhoneNumber           string                 `json:"phoneNumber" db:"phone_number"`
	EducationalBackground []EducationalBackground `json:"educationalBackground" db:"educational_background"`
}

type EducationalBackground struct {
	InstitutionName string  `json:"institutionName" db:"institution_name"`
	PassOutYear     int     `json:"passOutYear" db:"passOutYear"`
	CgpiScore       float64 `json:"cgpiScore" db:"cgpi_score"`
}
