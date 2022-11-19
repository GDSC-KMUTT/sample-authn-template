package model

/*
create table demo_store.products
(
    id               int            not null
        primary key,
    category_name    varchar(100)   not null,
    item_description text           not null,
    vendor           int            not null,
    vendor_name      varchar(100)   not null,
    bottle_size      int            not null,
    pack             int            not null,
    inner_pack       int            not null,
    proof            int            not null,
    list_date        datetime       not null,
    upc              bigint         null,
    scc              bigint         null,
    bottle_price     decimal(10, 2) null,
    shelf_price      decimal(10, 2) null,
    case_cost        decimal(10, 2) null
);
*/

type Product struct {
	ID              int    `json:"id"`
	CategoryName    string `json:"category_name"`
	ItemDescription string `json:"item_description"`
	Vendor          int    `json:"vendor"`
	VendorName      string `json:"vendor_name"`
	BottleSize      int    `json:"bottle_size"`
	Pack            int    `json:"pack"`
	InnerPack       int    `json:"inner_pack"`
	Proof           int    `json:"proof"`
	ListDate        string `json:"list_date"`
	UPC             int64  `json:"upc"`
	SCC             int64  `json:"scc"`
}
