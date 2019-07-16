package com.expenses.model;

import javax.persistence.Column;
import javax.persistence.Id;
import javax.persistence.MappedSuperclass;

/*
 * Class creates primary key. 
 * Note: Check database collation setting, key length may exceed max length.
 * utf8_general_ci is set for the "spending" database. 
 */

@MappedSuperclass  //Maps id to any entity class.
public class KeyEntity {
	@Id
	@Column(name="PK", unique=true)
	private String pk;

	public String getPk() {
		return pk;
	}

	public void setPk(String pk) {
		this.pk = pk;
	}
}
